/**
 * Splits a text into student records
 * @param {test} text - The text to split into student records 
 * @returns  {Array} - An array of strings, each containing a student's information
 */

function customStudentInfoSplitter(text) {
  // Split the text into individual student records
  const studentRecords = text.split("\n\n");

  return studentRecords.map((record) => {
    // Split each record into lines
    const lines = record.split("\n");

    // Create an object to store the student's information
    const studentInfo = {};

    lines.forEach((line) => {
      const [key, value] = line.split(" : ");
      if (key && value) {
        studentInfo[key.trim()] = value.trim();
      }
    });

    // Join the information back into a single string
    return Object.entries(studentInfo)
      .map(([key, value]) => `${key} : ${value}`)
      .join("\n");
  });
}

export default customStudentInfoSplitter;