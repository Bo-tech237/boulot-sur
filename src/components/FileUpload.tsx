'use client';
import { UploadDropzone } from '@/utils/uploadthing';
import { Button } from './ui/button';
import { useToast } from './ui/use-toast';
import { LucideTrash2 } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { removeFile } from '@/lib/actions';

interface FileUploadProps {
    onChange: any;
    value: any;
    onRemove: (value: any) => void;
}

export default function FileUpload({
    onChange,
    value,
    onRemove,
}: FileUploadProps) {
    const { toast } = useToast();
    const [key, setKey] = useState('');

    async function deleteFile() {
        let newKey = key && key;
        console.log('key', newKey);
        const deletedFile = await removeFile(newKey);
        console.log('deletedFile', deletedFile);
        if (deletedFile.success === false) {
            alert(deletedFile.message);
        }
        alert(deletedFile.message);
        onRemove('');
    }

    return (
        <div>
            {!value && (
                <UploadDropzone
                    className="dark:bg-zinc-800 py-2 ut-label:text-sm ut-allowed-content:ut-uploading:text-red-300"
                    endpoint="fileUploader"
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

                        toast({
                            title: 'PDF uploaded successfully',
                            variant: 'success',
                            description: res[0].serverData.uploadedBy,
                        });
                        setKey(res[0].key);
                        console.log('File:', res);

                        const data = res[0].url;
                        if (data) {
                            onChange(data);
                            value(data);
                        }
                    }}
                    onUploadError={(error: Error) => {
                        toast({
                            title: 'FileUpload Error',
                            variant: 'destructive',
                            description: error.message,
                        });
                    }}
                />
            )}
            <div className="my-2">
                {value && (
                    <div className="flex justify-between items-center">
                        <Link
                            href={value}
                            target="_blank"
                            className="bg-blue-700 text-white font-extrabold text-center py-1 rounded-sm w-20"
                        >
                            PDF
                        </Link>

                        <Button
                            className="flex gap-2"
                            type="button"
                            onClick={() => deleteFile()}
                            variant="destructive"
                            size="sm"
                        >
                            Delete
                            <LucideTrash2 className="h-4 w-5" />
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
