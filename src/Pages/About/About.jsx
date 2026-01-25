import React from 'react';
import EditorLayout from '../../layouts/EditorLayout/EditorLayout';
import FileTree from '../../components/Sidebar/FileTree';
import EditorTabs from '../../components/EditorTabs/EditorTabs';
import EditorContent from '../../components/EditorContent/EditorContent';
import SnippetPanel from '../../components/SnippetPanel/SnippetPanel';

const content = `/**
 * About me
 * I have several years of experience
 * building modern web applications
 * with clean and scalable architecture.
 */`;

function About() {
  return (
    <EditorLayout
      sidebar={<FileTree />}
      editor={
        <>
          <EditorTabs />
          <EditorContent content={content} />
        </>
      }
      snippetPanel={<SnippetPanel snippets={[]} />}
    />
  );
}

export default About;

