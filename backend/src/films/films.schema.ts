// src/films/schemas/film.schema.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface Session extends Document {
  id: string;
  film: string;
  daytime: string;
  day: string;
  time: string;
  hall: string;
  rows: number;
  seats: number;
  price: number;
  taken: string[];
}

export interface Film extends Document {
  id: string;
  rating: number;
  director: string;
  tags: string[];
  title: string;
  about: string;
  description: string;
  image: string;
  cover: string;
  schedule: Session[];
}

const SessionSchema = new Schema<Session>({
  id: { type: String, required: true },
  film: { type: String, required: true },
  daytime: { type: String, required: true },
  day: { type: String, required: true },
  time: { type: String, required: true },
  hall: { type: String, required: true },
  rows: { type: Number, required: true },
  seats: { type: Number, required: true },
  price: { type: Number, required: true },
  taken: { type: [String], default: [] },
});

const FilmSchema = new Schema<Film>({
  rating: { type: Number, required: true },
  director: { type: String, required: true },
  tags: { type: [String], default: [] },
  title: { type: String, required: true },
  about: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  cover: { type: String, required: true },
  schedule: { type: [SessionSchema], default: [] },
});

export const FilmModel = mongoose.model<Film>('Film', FilmSchema);
