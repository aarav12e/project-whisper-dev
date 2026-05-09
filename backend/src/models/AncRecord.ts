import { Schema, model, Document } from 'mongoose';

export interface AncRecordDocument extends Document {
  patient_id: string;
  visit_number: number;
  visit_date: string;
  weeks_pregnant?: number;
  weight_kg?: number;
  blood_pressure?: string;
  hemoglobin?: number;
  risk_factors?: string;
  complications?: string;
  next_visit_date?: string;
  delivery_date_estimate?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ancRecordSchema = new Schema<AncRecordDocument>(
  {
    patient_id: { type: String, required: true },
    visit_number: { type: Number, required: true },
    visit_date: { type: String, required: true },
    weeks_pregnant: { type: Number },
    weight_kg: { type: Number },
    blood_pressure: { type: String },
    hemoglobin: { type: Number },
    risk_factors: { type: String },
    complications: { type: String },
    next_visit_date: { type: String },
    delivery_date_estimate: { type: String },
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

export default model<AncRecordDocument>('AncRecord', ancRecordSchema);
