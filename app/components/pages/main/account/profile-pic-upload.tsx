import { Button } from "@/app/components/ui/button";
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@/app/components/ui/avatar";

const ProfilePicUpload = () => (
	<div className="flex items-center space-x-4 mb-6">
		<Avatar className="w-20 h-20">
			<AvatarImage src="/placeholder.svg" />
			<AvatarFallback className="text-lg">JD</AvatarFallback>
		</Avatar>
		<div className="space-y-2">
			<Button variant="outline">Change Picture</Button>
			<p className="text-sm text-gray-500">JPG, GIF or PNG. 1MB max.</p>
		</div>
	</div>
);

export default ProfilePicUpload;
