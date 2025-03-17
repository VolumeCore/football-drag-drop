export interface Player {
    id: number;
    name: string;
    surname: string;
    number: number;
    photo: string;
    position: string | null;
}

export interface FieldPosition {
    id: string;
    x: number;
    y: number;
    player: Player | null;
}
