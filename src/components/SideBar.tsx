import { memo, useEffect, useState } from "react";
import { api } from "../services/api";
import Button from "./Button";

interface SideBarProps {
  // genres: Array<{
  //   id: number;
  //   name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  //   title: string;
  // }>;
  selectedGenreId: number;
  buttonClickCallback: (args: any) => void;
}

interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

function SideBar({
  selectedGenreId,
  buttonClickCallback
}: SideBarProps) {
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  return (
    <nav className="sidebar">
      <span>Watch<p>Me</p></span>

      <div className="buttons-container">
        {genres.map(genre => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => buttonClickCallback(genre.id)}
            selected={selectedGenreId === genre.id}
          />
        ))}
      </div>

    </nav>
  )
}

export default memo(SideBar, (prev, next) => {
  return prev.selectedGenreId === next.selectedGenreId;
});
