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
    // Images
    {
      name: 'Nature Landscape',
      type: FileTypes.IMAGE,
      url: 'https://picsum.photos/800/600',
      metadata: {
        size: 1024 * 1024, // 1MB
        format: 'jpg',
        description: 'A beautiful nature landscape'
      }
    },
    {
      name: 'City View',
      type: FileTypes.IMAGE,
      url: 'https://picsum.photos/800/600?random=1',
      metadata: {
        size: 1.5 * 1024 * 1024, // 1.5MB
        format: 'jpg',
        description: 'Urban cityscape view'
      }
    },
    {
      name: 'Abstract Art',
      type: FileTypes.IMAGE,
      url: 'https://picsum.photos/800/600?random=2',
      metadata: {
        size: 2.2 * 1024 * 1024, // 2.2MB
        format: 'jpg',
        description: 'Modern abstract art piece'
      }
    },
    {
      name: 'Portrait Photo',
      type: FileTypes.IMAGE,
      url: 'https://picsum.photos/800/600?random=3',
      metadata: {
        size: 1.8 * 1024 * 1024, // 1.8MB
        format: 'jpg',
        description: 'Professional portrait photography'
      }
    },

    // PDFs
    {
      name: 'Technical Documentation',
      type: FileTypes.PDF,
      url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      metadata: {
        size: 2 * 1024 * 1024, // 2MB
        format: 'pdf',
        description: 'Technical documentation for the project'
      }
    },
    {
      name: 'User Manual',
      type: FileTypes.PDF,
      url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf?manual',
      metadata: {
        size: 3.5 * 1024 * 1024, // 3.5MB
        format: 'pdf',
        description: 'Comprehensive user manual'
      }
    },
    {
      name: 'Research Paper',
      type: FileTypes.PDF,
      url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf?research',
      metadata: {
        size: 4.2 * 1024 * 1024, // 4.2MB
        format: 'pdf',
        description: 'Academic research paper on modern technologies'
      }
    },

    // URLs
    {
      name: 'Meteor Official',
      type: FileTypes.URL,
      url: 'https://www.meteor.com',
      metadata: {
        description: 'Meteor official website - Full-stack JavaScript platform'
      }
    },
    {
      name: 'React Documentation',
      type: FileTypes.URL,
      url: 'https://reactjs.org',
      metadata: {
        description: 'Official React documentation and learning resources'
      }
    },
    {
      name: 'Ant Design',
      type: FileTypes.URL,
      url: 'https://ant.design',
      metadata: {
        description: 'Ant Design - A design system for enterprise-level products'
      }
    }
  ];

  for (const file of dummyFiles) {
    await createFile(file);
  }
}; 