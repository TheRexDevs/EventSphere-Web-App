import * as z from "zod";

export const contactSchema = z.object({
	name: z.string().min(2, "Name is too short"),
	email: z.string().email("Enter a valid email"),
	subject: z.string().min(3, "Subject is required"),
	message: z.string().min(10, "Message must be at least 10 characters"),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
