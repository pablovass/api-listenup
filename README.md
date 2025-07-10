# api-listenup

# 🎧 Listening Practice API (Next.js + TypeScript)

This is the Next.js migration of the original **Listening Practice API**, designed to help users improve their **English listening comprehension**. It offers endpoints for retrieving dictation phrases, verifying user input, and serving audio files. The API is structured to maintain the same routes as the original Flask implementation, making the transition seamless for existing clients or frontends.

---

## ✅ Ready for Vercel Deployment

This API is optimized for serverless deployment platforms such as **Vercel**. Each route is implemented using Next.js **API Routes**, ensuring fast and scalable access with zero-config hosting.

---

## ✨ Features

- **Get Phrases with Audio**: Access dictation sentences with associated audio files.
- **Automatic Text Validation**: Submit user transcriptions to verify correctness.
- **Filter by Difficulty or Tags**: Use metadata to customize practice based on difficulty (`básico`, `intermedio`, `avanzado`) and tags.

---

## 🛣️ Endpoints Overview (Preserved from Flask Version)

### `/frases`
| Method | Endpoint               | Description                                        |
|--------|------------------------|----------------------------------------------------|
| GET    | `/frases/`             | List all phrases available                         |
| GET    | `/frases/random`       | Retrieve a random phrase with audio                |
| GET    | `/frases/recargar`     | Reload JSON phrases manually (dev only)            |
| POST   | `/frases/verificar`    | Validate user's transcription                      |

### `/audio`
| Method | Endpoint               | Description                                        |
|--------|------------------------|----------------------------------------------------|
| GET    | `/audio/<filename>`    | Serve the requested audio file                     |

### `/respuesta`
| Method | Endpoint               | Description                                        |
|--------|------------------------|----------------------------------------------------|
| POST   | `/respuesta`           | Validate and give feedback on a user's response    |

> ℹ️ These routes will remain unchanged in the Next.js API route structure under `/api`.

---

## 🚀 Deployment on Vercel

1. Push the project to a GitHub/GitLab/Bitbucket repository.
2. Go to [https://vercel.com](https://vercel.com) and import the project.
3. Vercel will detect Next.js automatically and deploy.
4. Audio files must be placed under `/public/audio/` to be accessible via `/audio/<filename>`.

---

## 🧱 Project Structure (Next.js)

```plaintext
project/
├── public/
│   └── audio/                 # Audio files served as static assets
├── src/
│   └── pages/
│       └── api/
│           ├── frases/
│           │   ├── index.ts       # GET /frases/
│           │   ├── random.ts      # GET /frases/random
│           │   ├── recargar.ts    # GET /frases/recargar
│           │   └── verificar.ts   # POST /frases/verificar
│           ├── audio/
│           │   └── [filename].ts  # GET /audio/:filename
│           └── respuesta.ts       # POST /respuesta
├── frases_json/               # Local JSON file with all phrases
├── utils/                     # Helper functions, phrase validation
├── package.json
├── README.md
└── tsconfig.json
````

---

## 🧪 Testing (WIP)

Testing will be implemented using **Jest** and **supertest** for API endpoints.

To run tests:

```bash
npm run test
```

---

## 🔄 Example Requests

### 📥 Get Random Phrase

```bash
GET /api/frases/random
```

**Response:**

```json
{
  "id": 3,
  "texto": "What would you say is your greatest strength?",
  "audio": "03.mp3",
  "nivel": "intermedio",
  "tags": ["strength", "habilidades"]
}
```

### ✅ Verify Transcription

```bash
POST /api/frases/verificar
Content-Type: application/json

{
  "id": 3,
  "texto": "What would you say is your greatest strength?"
}
```

**Response:**

```json
{
  "error": false,
  "mensaje": "Verificación completada",
  "detalles": [
    { "palabra": "What", "correcta": true },
    ...
  ],
  "texto_original": "What would you say is your greatest strength?",
  "texto_usuario": "What would you say is your greatest strength?"
}
```

---

## 📂 Phrase Data Structure

Stored in a local JSON file (`frases.json`) under `/frases_json`.

```json
[
  {
    "id": 1,
    "texto": "Can you tell me about yourself and your professional background?",
    "audio": "01.mp3",
    "nivel": "intermedio",
    "tags": ["My speech", "introducción"]
  }
]
```

---

## 🔮 Future Improvements

* Switch to a database (PostgreSQL or SQLite) for persistence.
* Add user authentication and progress tracking.
* Improve text-matching logic using NLP (e.g., Levenshtein, embeddings).
* Integrate speech recognition to allow spoken input.

---

## 👨‍💻 Authors

Designed and maintained to support English learners through listening and transcription practice. Feel free to contribute or fork this project to enhance it further.

