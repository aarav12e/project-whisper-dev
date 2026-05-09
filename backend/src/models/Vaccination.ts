import { Schema, model, Document } from 'mongoose';

export interface VaccinationDocument extends Document {
  patient_name: string;
  vaccine_name: string;
  batch_number?: string;
  due_date: string;
  administered_date?: string;
  status: string;
  next_due_date?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const vaccinationSchema = new Schema<VaccinationDocument>(
  {
    patient_name: { type: String, required: true },
    vaccine_name: { type: String, required: true },
    batch_number: { type: String },
    due_date: { type: String, required: true },
    administered_date: { type: String },
    status: { type: String, required: true },
    next_due_date: { type: String },
    notes: { type: String },
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

export default model<VaccinationDocument>('Vaccination', vaccinationSchema);
