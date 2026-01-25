import React, { useState } from 'react';
import { RiMailLine, RiPhoneLine } from 'react-icons/ri';
import FolderItem from './FolderItem';
import FileItem from './FileItem';
import styles from './Sidebar.module.css';

const FileTree = () => {
  const [activeFile, setActiveFile] = useState(null);

  const handleFileClick = (fileName) => {
    setActiveFile(fileName);
  };

  return (
    <ul className={styles.fileTree}>
      <FolderItem name="personal-info">
        <FileItem name="bio" isActive={activeFile === 'bio'} onClick={() => handleFileClick('bio')} />
        <FileItem name="interests" isActive={activeFile === 'interests'} onClick={() => handleFileClick('interests')} />
        <FolderItem name="education">
          <FileItem name="high-school" isActive={activeFile === 'high-school'} onClick={() => handleFileClick('high-school')} />
          <FileItem name="university" isActive={activeFile === 'university'} onClick={() => handleFileClick('university')} />
        </FolderItem>
      </FolderItem>
      <FolderItem name="contacts">
        <FileItem 
          name="user@gmail.com" 
          isActive={activeFile === 'user@gmail.com'} 
          onClick={() => handleFileClick('user@gmail.com')}
          icon={<RiMailLine />}
        />
        <FileItem 
          name="+3598246359" 
          isActive={activeFile === '+3598246359'} 
          onClick={() => handleFileClick('+3598246359')}
          icon={<RiPhoneLine />}
        />
      </FolderItem>
    </ul>
  );
};

export default FileTree;

