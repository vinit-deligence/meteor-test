# FileNest - Meteor Test Project for zipBoard

A Meteor-based file management application that demonstrates handling different types of files (Images, PDFs, and URLs) along with user management capabilities. This project was created as a test project for zipBoard.

## Important Note

This repository is for testing purposes only. Please fork this repository to your own account and do not modify this original repository. All your work should be done in your forked version.

## 🚀 Features

- User management with profile information
- File management system supporting multiple file types:
  - Images with preview
  - PDF documents
  - URL bookmarks
- Modern UI using Ant Design
- Real-time updates with Meteor
- MongoDB integration

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- [Meteor](https://www.meteor.com/install) (Latest version)
- [MongoDB Compass](https://www.mongodb.com/try/download/compass) (Optional but recommended for database management)
- Node.js (Latest LTS version recommended)

## 🛠️ Installation

1. Fork this repository
   ```bash
   # Click the Fork button on the top right of this repository
   # Then clone your forked repository
   git clone https://github.com/YOUR_USERNAME/meteor-test.git
   cd meteor-test
   ```

2. Install dependencies
   ```bash
   meteor npm install
   ```

3. Start the application
   ```bash
   meteor run
   ```

4. Access the application
   - Open your browser and navigate to `http://localhost:3000`
   - The application will automatically seed the database with sample users and files

## 🔧 Database Connection

The application uses MongoDB as its database. By default, Meteor runs MongoDB on port 3001.

To connect using MongoDB Compass:
- Connection URL: `mongodb://localhost:3001/`
- No authentication required for local development

## 📁 Project Structure

```
meteor-test/
├── client/             # Client-side code
│   └── styles/        # CSS/SCSS files
├── imports/           # Shared code
│   ├── api/          # Collections and methods
│   └── ui/           # React components
├── server/           # Server-side code
└── public/           # Static assets
```

## 🎯 Key Components

- **Users Collection**: Manages user profiles with name and color preferences
- **Files Collection**: Handles different types of files (Images, PDFs, URLs)
- **React Components**:
  - App: Main application layout
  - Users: User management interface
  - Files: File management with type-based organization

## 🧪 Testing

The project includes basic test setup. To run tests:
```bash
meteor test --once --driver-package meteortesting:mocha
```

## 📝 Notes

- This is a test project and should be forked for any modifications
- The database is automatically seeded with sample data on first run
- All file URLs in the sample data are for demonstration purposes

## 📄 License

This project is created for zipBoard testing purposes.

## 👥 Contact

For any questions or concerns, please contact support@zipboard.co
