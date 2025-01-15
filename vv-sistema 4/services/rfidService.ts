import express from 'express';
import { RFIDReader, RFIDReaderConfig } from '../lib/rfid/RFIDReader';
import { ChafonReader } from '../lib/rfid/ChafonReader';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
app.use(express.json());
app.use(cors());

let reader: RFIDReader | null = null;
const YANPODE_SERVER_URL = 'http://localhost:3002';

app.post('/connect', async (req, res) => {
  const { readerType, ...config } = req.body;

  try {
    if (reader) {
      await reader.disconnect();
    }

    if (readerType === 'yanpode') {
      const response = await fetch(`${YANPODE_SERVER_URL}/connect`, { method: 'POST' });
      const result = await response.json();
      if (result.success) {
        res.json({ success: true, message: 'Yanpode reader connected successfully' });
      } else {
        throw new Error(result.message);
      }
    } else if (readerType === 'chafon') {
      reader = new ChafonReader(config);
      await reader.connect();
      res.json({ success: true, message: 'Chafon reader connected successfully' });
    } else {
      throw new Error('Invalid reader type');
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.post('/disconnect', async (req, res) => {
  const { readerType } = req.body;

  try {
    if (readerType === 'yanpode') {
      const response = await fetch(`${YANPODE_SERVER_URL}/disconnect`, { method: 'POST' });
      const result = await response.json();
      if (result.success) {
        res.json({ success: true, message: 'Yanpode reader disconnected successfully' });
      } else {
        throw new Error(result.message);
      }
    } else if (reader) {
      await reader.disconnect();
      reader = null;
      res.json({ success: true, message: 'Chafon reader disconnected successfully' });
    } else {
      throw new Error('No reader connected');
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.post('/startReading', async (req, res) => {
  const { readerType } = req.body;

  try {
    if (readerType === 'yanpode') {
      const response = await fetch(`${YANPODE_SERVER_URL}/start_reading`, { method: 'POST' });
      const result = await response.json();
      if (result.success) {
        res.json({ success: true, message: 'Started reading tags on Yanpode' });
      } else {
        throw new Error(result.message);
      }
    } else if (reader) {
      await reader.startReading();
      res.json({ success: true, message: 'Started reading tags on Chafon' });
    } else {
      throw new Error('No reader connected');
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.post('/stopReading', async (req, res) => {
  const { readerType } = req.body;

  try {
    if (readerType === 'yanpode') {
      const response = await fetch(`${YANPODE_SERVER_URL}/stop_reading`, { method: 'POST' });
      const result = await response.json();
      if (result.success) {
        res.json({ success: true, message: 'Stopped reading tags on Yanpode' });
      } else {
        throw new Error(result.message);
      }
    } else if (reader) {
      await reader.stopReading();
      res.json({ success: true, message: 'Stopped reading tags on Chafon' });
    } else {
      throw new Error('No reader connected');
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.get('/tags', async (req, res) => {
  const { readerType } = req.query;

  if (readerType === 'yanpode') {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive'
    });

    const sendTags = async () => {
      try {
        const response = await fetch(`${YANPODE_SERVER_URL}/get_tags`);
        const result = await response.json();
        if (result.success) {
          res.write(`data: ${JSON.stringify(result.tags)}\n\n`);
        }
      } catch (error) {
        console.error('Error fetching Yanpode tags:', error);
      }
      setTimeout(sendTags, 1000); // Poll every second
    };

    sendTags();

    req.on('close', () => {
      // Clean up when client disconnects
    });
  } else if (reader) {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive'
    });

    const sendTag = (tag: any) => {
      res.write(`data: ${JSON.stringify([tag])}\n\n`);
    };

    reader.onTagRead(sendTag);

    req.on('close', () => {
      reader?.removeListener('tagRead', sendTag);
    });
  } else {
    res.status(400).json({ success: false, message: 'No reader connected' });
  }
});

app.post('/write-tag', async (req, res) => {
  const { readerType, data } = req.body;

  if (readerType === 'yanpode') {
    try {
      const response = await fetch(`${YANPODE_SERVER_URL}/write_tag`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data }),
      });
      const result = await response.json();
      res.json(result);
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error writing tag to Yanpode reader' });
    }
  } else {
    res.status(400).json({ success: false, message: 'Write operation not supported for this reader type' });
  }
});

app.post('/toggleMute', async (req, res) => {
  const { readerType } = req.body;

  if (readerType === 'chafon' && reader instanceof ChafonReader) {
    try {
      const isMuted = await reader.toggleMute();
      res.json({ success: true, isMuted });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error toggling mute on Chafon reader' });
    }
  } else {
    res.status(400).json({ success: false, message: 'Mute operation not supported for this reader type' });
  }
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`RFID service listening on port ${port}`);
});

