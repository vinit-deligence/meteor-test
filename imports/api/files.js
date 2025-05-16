import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

// Define the Files collection
export const FilesCollection = new Mongo.Collection('files');

// Define file types
export const FileTypes = {
  IMAGE: 'image',
  PDF: 'pdf',
  URL: 'url'
};

// Define the schema for a file
export const FileSchema = {
  name: String,
  type: String,
  url: String,
  createdAt: Date,
  metadata: {
    size: Number,      // For images and PDFs
    format: String,    // For images and PDFs
    description: String // For all types
  }
};

// Helper function to create a new file
export const createFile = async ({ name, type, url, metadata }) => {
  const file = {
    name,
    type,
    url,
    createdAt: new Date(),
    metadata
  };
  
  return await FilesCollection.insertAsync(file);
};

// Seed function for dummy files
export const seedFiles = async () => {
  const dummyFiles = [
    {
      name: 'Sample Image',
      type: FileTypes.IMAGE,
      url: 'https://picsum.photos/800/600',
      metadata: {
        size: 1024 * 1024, // 1MB
        format: 'jpg',
        description: 'A beautiful sample image'
      }
    },
    {
      name: 'Sample PDF',
      type: FileTypes.PDF,
      url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      metadata: {
        size: 2 * 1024 * 1024, // 2MB
        format: 'pdf',
        description: 'A sample PDF document'
      }
    },
    {
      name: 'Sample URL',
      type: FileTypes.URL,
      url: 'https://www.meteor.com',
      metadata: {
        description: 'Meteor official website'
      }
    }
  ];

  for (const file of dummyFiles) {
    await createFile(file);
  }
}; 