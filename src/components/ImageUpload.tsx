'use client';
import { UploadDropzone } from '@/utils/uploadthing';
import Image from 'next/image';
import { Button } from './ui/button';
import { useToast } from './ui/use-toast';
import { LucideTrash2 } from 'lucide-react';
import { useState } from 'react';
import { removeImage } from '@/lib/actions';

interface ImageUploadProps {
    onChange: any;
    value: any;
    onRemove: (value: any) => void;
}

export default function ImageUpload({
    onChange,
    value,
    onRemove,
}: ImageUploadProps) {
    const { toast } = useToast();
    const [key, setKey] = useState('');

    async function deleteImage() {
        let newKey = key && key;
        const deletedImage = await removeImage(newKey);
        console.log('deletedImage', deletedImage);

        if (deletedImage.success === false) {
            alert(deletedImage.message);
        }
        alert(deletedImage.message);

        onRemove('');
    }

    return (
        <div>
            {!value && (
                <UploadDropzone
                    className="dark:bg-zinc-800 py-2 ut-label:text-sm ut-allowed-content:ut-uploading:text-red-300"
                    endpoint="imageUploader"
                    content={{
                        allowedContent({ isUploading }) {
                            if (isUploading)
                                return (
                                    <>
                                        <p className="mt-2 text-sm text-slate-400 animate-pulse">
                                            Uploading...
                                        </p>
                                    </>
                                );
                        },
                    }}
                    onClientUploadComplete={(res) => {
                        // Do something with the response
                        alert('Upload Completed');
                        console.log('File:', res);
                        setKey(res[0].key);
                        const data = res[0].url;
                        if (data) {
                            toast({
                                title: 'Image uploaded successfully',
                                variant: 'success',
                            });
                            onChange(data);
                            value(data);
                        }
                    }}
                    onUploadError={(error: Error) => {
                        toast({
                            title: 'ImageUpload Error',
                            variant: 'destructive',
                            description: error.message,
                        });
                    }}
                />
            )}
            <div className="flex items-center justify-center">
                {value && (
                    <div className="relative w-[200px] h-[200px] rounded-md overflow-hidden">
                        <div className="z-10 absolute top-2 right-2">
                            <Button
                                type="button"
                                onClick={() => deleteImage()}
                                variant="destructive"
                                size="sm"
                            >
                                <LucideTrash2 className="h-4 w-4" />
                            </Button>
                        </div>
                        <div>
                            {value && (
                                <Image
                                    fill
                                    className="object-cover"
                                    alt="Image"
                                    src={value}
                                />
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
