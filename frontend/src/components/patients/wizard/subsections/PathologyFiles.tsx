'use client';

import React, { useState, useCallback } from 'react';
import { useFormContext } from '../FormContext';

/**
 * PathologyFiles Sub-Component
 *
 * Allows uploading pathology reports (PDF, Images)
 *
 * Features:
 * - Multi-file upload with drag-and-drop
 * - File preview and removal
 * - Stores files for deferred upload
 */

export interface PathologyFile {
    fileName: string;
    fileSize: number;
    fileType: string;
    uploadDate: string;
    file?: File;
}

interface PathologyFilesData {
    pathologyFiles: PathologyFile[];
}

export function PathologyFiles() {
    const { getSection, updateSection } = useFormContext();
    const savedData = (getSection('section4') as any) || {};

    const [files, setFiles] = useState<PathologyFile[]>(
        savedData.pathologyFiles || []
    );
    const [isDragOver, setIsDragOver] = useState(false);

    // Update form context
    const updateFormData = useCallback((newFiles: PathologyFile[]) => {
        setFiles(newFiles);
        updateSection('section4', {
            ...savedData,
            pathologyFiles: newFiles,
        });
    }, [savedData, updateSection]);

    // Handle file upload
    const handleFileUpload = (fileList: FileList | null) => {
        if (!fileList || fileList.length === 0) return;

        const newFiles: PathologyFile[] = Array.from(fileList).map((file) => ({
            fileName: file.name,
            fileSize: file.size,
            fileType: file.type,
            uploadDate: new Date().toISOString(),
            file: file,
        }));

        updateFormData([...files, ...newFiles]);
    };

    // Remove uploaded file
    const removeFile = (index: number) => {
        const updatedFiles = files.filter((_, i) => i !== index);
        updateFormData(updatedFiles);
    };

    // Drag and drop handlers
    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
        const droppedFiles = e.dataTransfer.files;
        handleFileUpload(droppedFiles);
    };

    // Format file size
    const formatFileSize = (bytes: number): string => {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
        return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    };

    return (
        <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Upload Hasil Patologi (Pathology Reports)
            </h3>

            {/* Drag and Drop Zone */}
            <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`
          border-2 border-dashed rounded-lg p-6 text-center
          transition-all cursor-pointer
          ${isDragOver
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-300 hover:border-purple-400 hover:bg-gray-50'
                    }
        `}
            >
                <input
                    type="file"
                    multiple
                    accept=".pdf,image/*,.dcm"
                    onChange={(e) => handleFileUpload(e.target.files)}
                    className="hidden"
                    id="pathology-file-upload"
                />
                <label
                    htmlFor="pathology-file-upload"
                    className="cursor-pointer flex flex-col items-center"
                >
                    <svg
                        className="w-12 h-12 text-gray-400 mb-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span className="text-sm text-gray-600 font-medium">
                        Klik untuk upload atau drag & drop file laporan
                    </span>
                    <span className="text-xs text-gray-500 mt-1">
                        PDF, JPG, PNG, DICOM - Max 10MB per file
                    </span>
                </label>
            </div>

            {/* Uploaded Files List */}
            {files.length > 0 && (
                <div className="mt-4 space-y-2">
                    <p className="text-sm font-medium text-gray-700">
                        File yang diupload ({files.length}):
                    </p>
                    {files.map((file, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-between bg-gray-50 px-4 py-3 rounded-lg border border-gray-200"
                        >
                            <div className="flex items-center gap-3 flex-1 min-w-0">
                                <svg
                                    className="w-5 h-5 text-purple-500 flex-shrink-0"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                                </svg>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 truncate">
                                        {file.fileName}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        {formatFileSize(file.fileSize)} • {new Date(file.uploadDate).toLocaleString('id-ID')}
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => removeFile(index)}
                                className="ml-3 px-3 py-1 text-red-600 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
                                title="Hapus file"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        fillRule="evenodd"
                                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
