import { Schema, model, Document } from 'mongoose';

export interface VisitDocument extends Document {
  patient_name: string;
  visit_date: string;
  chief_complaint?: string;
  symptoms?: string;
  treatment_given?: string;
  referral_required: boolean;
  referral_details?: string;
  follow_up_date?: string;
  status: string;
  voice_notes_url?: string;
  photos?: string;
  gps_latitude?: number;
  gps_longitude?: number;
  createdAt: Date;
  updatedAt: Date;
}

const visitSchema = new Schema<VisitDocument>(
  {
    patient_name: { type: String, required: true },
    visit_date: { type: String, required: true },
    chief_complaint: { type: String },
    symptoms: { type: String },
    treatment_given: { type: String },
    referral_required: { type: Boolean, default: false },
    referral_details: { type: String },
    follow_up_date: { type: String },
    status: { type: String, required: true },
    voice_notes_url: { type: String },
    photos: { type: String },
    gps_latitude: { type: Number },
    gps_longitude: { type: Number },
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

export default model<VisitDocument>('Visit', visitSchema);
