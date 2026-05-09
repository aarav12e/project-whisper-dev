import { Schema, model, Document } from 'mongoose';

export interface PatientDocument extends Document {
  full_name: string;
  age: number;
  gender: string;
  contact_number?: string;
  address?: string;
  village?: string;
  gps_latitude?: number;
  gps_longitude?: number;
  photo_url?: string;
  medical_history?: string;
  family_details?: string;
  is_pregnant: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const patientSchema = new Schema<PatientDocument>(
  {
    full_name: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    contact_number: { type: String },
    address: { type: String },
    village: { type: String },
    gps_latitude: { type: Number },
    gps_longitude: { type: Number },
    photo_url: { type: String },
    medical_history: { type: String },
    family_details: { type: String },
    is_pregnant: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform(_, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

export default model<PatientDocument>('Patient', patientSchema);
