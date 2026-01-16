import React from 'react'
import { Controller } from 'react-hook-form'
import { Editor } from '@tinymce/tinymce-react'

export default function RTE({ name, control, label, defaultValue = "" }) {

  const [editorTheme, setEditorTheme] = React.useState(() => {
    return localStorage.getItem('editorTheme') || 'light';
  });

  const toggleEditorTheme = () => {
    const newTheme = editorTheme === 'light' ? 'dark' : 'light';
    setEditorTheme(newTheme);
    localStorage.setItem('editorTheme', newTheme); 
  };

  /* 🔹 TinyMCE theme configs */
  const editorThemeConfig = {
    light: {
      skin: 'oxide',
      content_css: 'default',
      content_style: `
        body {
          background: #ffffff;
          color: #0f172a;
          font-family: Inter, system-ui;
          font-size: 15px;
          line-height: 1.7;
          padding: 16px;
        }
      `,
    },
    dark: {
      skin: 'oxide-dark',
      content_css: 'dark',
      content_style: `
        body {
          background: #020617;
          color: #e5e7eb;
          font-family: Inter, system-ui;
          font-size: 15px;
          line-height: 1.7;
          padding: 16px;
        }
      `,
    },
  };

  return (
    <div className="w-full">
      {label && (
        <label className="inline-block mb-2 pl-1 text-sm font-semibold">
          {label}
        </label>
      )}

      <div className="overflow-hidden rounded-xl border shadow-sm dark:bg-indigo-950 bg-cyan-100">

        <div className="flex justify-end px-3 py-2 border-b">
          <button
            onClick={toggleEditorTheme}
            className="text-sm px-3 py-1 rounded-md bg-gray-100 hover:bg-gray-200 cursor-pointer"
          >
            {editorTheme === 'light' ? '🌙 Dark' : '☀️ Light'}
          </button>
        </div>

        <Controller
          name={name}
          control={control}
          defaultValue={defaultValue}
          render={({ field: { onChange, value } }) => (
            <Editor
              apiKey="251af0wlnczdnk00hshnnvxesbx2rvcznqgd5lrljj0gj9p7"
              key={editorTheme} 
              value={value}
              onEditorChange={onChange}
              init={{
                height: 480,
                menubar: true,
                skin: editorThemeConfig[editorTheme].skin,
                content_css: editorThemeConfig[editorTheme].content_css,
                plugins: [
                  'image', 'advlist', 'autolink', 'lists', 'link',
                  'charmap', 'preview', 'anchor', 'searchreplace',
                  'visualblocks', 'code', 'fullscreen', 'media',
                  'table', 'help', 'wordcount',
                ],
                toolbar:
                  'undo redo | blocks | bold italic underline | forecolor | ' +
                  'alignleft aligncenter alignright alignjustify | ' +
                  'bullist numlist outdent indent | link image | code fullscreen',
                content_style: editorThemeConfig[editorTheme].content_style,
              }}
            />
          )}
        />
      </div>
    </div>
  );
}