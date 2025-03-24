import fs from "fs/promises";
import path from "path";

async function generatePlaylist() {
  try {
    const musicDir = path.resolve("public/music");
    console.log(`Scanning directory: ${musicDir}`);

    // Check if directory exists
    try {
      await fs.access(musicDir);
    } catch (error) {
      console.error(`Directory ${musicDir} does not exist!`);
      console.log("Creating music directory...");
      await fs.mkdir(musicDir, { recursive: true });
    }

    // Read all files in the music directory
    const files = await fs.readdir(musicDir);

    // Filter for mp3 files (you can expand this to include other audio formats if needed)
    const musicFiles = files.filter((file) =>
      [".mp3", ".wav", ".ogg", ".flac"].includes(
        path.extname(file).toLowerCase(),
      ),
    );

    console.log(`Found ${musicFiles.length} audio files`);

    // Create playlist entries
    const playlist = musicFiles.map((file) => ({
      src: `./music/${file}`,
    }));

    // Write to playlist.json
    const playlistPath = path.resolve("public/playlist.json");
    await fs.writeFile(playlistPath, JSON.stringify(playlist, null, 2));

    console.log(`Playlist generated successfully at ${playlistPath}`);
  } catch (error) {
    console.error("Error generating playlist:", error);
  }
}

generatePlaylist();
