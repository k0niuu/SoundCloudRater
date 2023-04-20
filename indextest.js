const functions = require("firebase-functions");
const {exec} = require("child_process");

exports.downloadUserTracks = functions.https.onCall((data, context) => {
  const scriptPath = "./downloadusertracks.js";

  exec(`node ${scriptPath}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return {
        success: false,
        error: error.message,
      };
    }

    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return {
        success: false,
        error: stderr,
      };
    }

    console.log(`stdout: ${stdout}`);

    return {
      success: true,
      message: "User tracks downloaded successfully",
    };
  });
});
