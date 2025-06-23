# 📡 ChitraShaala API

A RESTful API built with Node.js and Express that provides endpoints for an API-based image management system similar to Google Photos with authentication through Google Auth. Designed for scalability and easy integration.

## 🚀 Features

- ✅ User Registration & Authentication (Google OAuth)
- ✅ CRUD Operations for Albums, Images
- ✅ Image Upload with Cloudinary and Multer
- ✅ MongoDB Integration with Mongoose
- ✅ CORS enabled for frontend integration

---

## 🛠 Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose), Cloudinary (Images)
- **Authentication:** OAuth 2.0 (Google)
- **Environment Management:** dotenv

---

## 📦 Installation

```bash
# Clone the repo
git clone https://github.com/SherlockValer/ChitraShaala-API

# Navigate into the folder
cd ChitraShaala-API

# Install dependencies
npm install
```

---

## ⚙️ Environment Setup

Create a `.env` file in the root directory with the following:

```env
NODE_ENV=development
PORT=3000
MONGODB_URI=

COOKIE_EXPIRE=1

FRONTEND_URL=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

---

## ▶️ Running the Server

```bash
# Development mode
npm run start:dev

# Production mode
npm run start:prod
```

Server will start at: `http://localhost:3000`

---

## 📖 API Endpoints

### Authentication

| Method | Endpoint         | Description         |
|--------|------------------|---------------------|
| GET   | `/v1/auth/google` | SignUp using google oauth 2.0 and store token in cookies |
| GET   | `/v1/logout`    | Logout user and clear cookies |

### Albums

| Method | Endpoint        | Description              |
|--------|------------------|--------------------------|
| GET    | `v1/albums`     | Get all albums of current user   |
| POST   | `v1/albums`     | Create a new album for current user        |
| POST    | `v1/albums/:albumId` | Update album details for current user     |
| POST    | `v1/albums/:albumId/share` | Share album with other users     |
| DELETE | `v1/albums/:albumId` | Delete selected album       |

> All routes are protected. Needs authentication to access.

### Images

| Method | Endpoint        | Description              |
|--------|------------------|--------------------------|
| GET    | `v1/albums/:albumId/images`     | Get all images in an album   |
| GET   | `v1/albums/:albumId/images/favorites`     | Get favorite images in an album        |
| GET    | `v1/albums/:albumId/images?tags=sunset` | Get Images by Tags     |
| POST    | `v1/albums/:albumId/images` | Upload an image     |
| POST    | `v1/albums/:albumId/images/:imageId/favorite` | Star (favorite) an image     |
| POST    | `v1/albums/:albumId/images/:imageId/comments` | Add comment to image     |
| DELETE | `v1/albums/:albumId/images/:imageId` | Delete album       |

> All routes are protected. Needs authentication to access.

---


## 📁 Folder Structure

```
ChitraShaala-API/
├── config/
├── controllers/
├── middlewares/
├── models/
├── public/
├── routes/
├── utils/
├── .env
├── server.js
```

---

## 🙌 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## 📄 License

[MIT](LICENSE)

---

## ✨ Author

**Vaibhav Chopde**  
[GitHub](https://github.com/SherlockValer) 
