import { saveAs } from 'file-saver';

export const useDownloadAnswers = () => {
  const saveAsDocx = (items: string[]) => {
    const blob = new Blob([items.join('\n')], {
      type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    });

    saveAs(blob, `Quiz-${Date.now()}.docx`);
  };

  return {
    saveAsDocx,
  };
};
