import React from "react";

interface AudioPlayerProps {
  audioUrl: string; // URL du fichier audio
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioUrl }) => {
  return (
    <div className="w-full bg-gray-100 p-4 rounded-lg flex items-center gap-4">
      <audio controls className="w-full">
        <source src={audioUrl} type="audio/mpeg" />
        Votre navigateur ne supporte pas la lecture audio.
      </audio>
    </div>
  );
};