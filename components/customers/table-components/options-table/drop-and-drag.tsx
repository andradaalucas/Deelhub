"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { createCustomersFromCsv } from "@/queries/client/customers";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { File, Upload, X } from "lucide-react";
import Papa from "papaparse";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";

export function DropAndDrag({ isOpen, setIsOpen }: any) {
  const [file, setFile] = useState<File | null>(null);
  const [parsedData, setParsedData] = useState<any[]>([]);
  const [rowsWithMissingFields, setRowsWithMissingFields] = useState<any[]>([]);

  const queryClient = useQueryClient();
  const createCustomer = useMutation({
    mutationFn: createCustomersFromCsv,
    onSuccess: () => {
      queryClient.invalidateQueries(["customers"]);
    },
    onError: () => {
      queryClient.invalidateQueries(["customers"]);
    },
  });

  // Función para parsear el CSV y validar campos faltantes
  const parseCSV = (file: File) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        const data = results.data;

        // Verificar si alguna fila tiene 'name' o 'email' vacíos
        const incompleteRows = data.filter(
          (row: any) => !row.name || !row.email,
        );

        if (incompleteRows.length > 0) {
          setRowsWithMissingFields(incompleteRows);
          toast.warning(
            `${incompleteRows.length} row(s) have missing name or email fields. You will be able to edit them later.`,
          );
        }

        setParsedData(data);
        console.log(data);
      },
    });
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles[0].type === "text/csv") {
      setFile(acceptedFiles[0]);
      parseCSV(acceptedFiles[0]);
    } else {
      alert("Please upload a CSV file");
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "text/csv": [".csv"],
    },
    multiple: false,
  });

  const handleUploadCustomers = async () => {
    const promise = createCustomer.mutateAsync(parsedData);

    toast.promise(promise, {
      loading: "Uploading customers...",
      success: (data) => {
        return rowsWithMissingFields.length > 0
          ? `${rowsWithMissingFields.length} customers have missing fields. Please edit them later.`
          : "All customers imported successfully!";
      },
      error: "Failed to upload customers. Please try again.",
    });

    promise.then(() => setIsOpen(false));
    promise.then(() => setFile(null));
  };

  const removeFile = () => {
    setFile(null);
    setParsedData([]);
    setRowsWithMissingFields([]); // Resetear las filas incompletas
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <AlertDialogContent className="p-0">
        <AlertDialogHeader className="p-8">
          <AlertDialogTitle className="mb-2 mt-4">
            Import CSV File
          </AlertDialogTitle>
          <AlertDialogDescription className="mb-4">
            Upload a CSV file containing customer information to import new
            customers.
          </AlertDialogDescription>

          <div
            {...getRootProps()}
            tabIndex={-1} // Evita que el foco caiga automáticamente aquí
            className={`cursor-pointer rounded-lg border-2 border-dashed p-8 pt-24 text-center transition-colors ${
              isDragActive
                ? "border-primary bg-primary/10"
                : "border-gray-300 hover:border-primary"
            }`}
          >
            <input {...getInputProps()} />
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2 text-sm text-gray-600">
              {isDragActive
                ? "Drop the CSV file here"
                : "Drag 'n' drop a CSV file here, or click to select one"}
            </p>
          </div>

          {file && (
            <div className="mt-4 flex items-center justify-between rounded-lg bg-zinc-100/75 p-4 dark:bg-zinc-900/75">
              <div className="flex items-center">
                <File className="mr-2 h-5 w-5 text-primary" />
                <span className="text-sm font-medium">{file.name}</span>
              </div>
              <Button variant="ghost" size="icon" onClick={removeFile}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}
        </AlertDialogHeader>

        {/* <AlertDialogFooter className="flex items-end rounded-b-lg border bg-zinc-100/75 px-8 py-4 dark:bg-zinc-900/75">
          <div className="flex items-center gap-2">
            <AlertDialogCancel className="mt-0">Cancel</AlertDialogCancel>
            <AlertDialogAction
              disabled={!file}
              onClick={handleUploadCustomers}
              className="bg-blue font-semibold text-white hover:bg-hoverBlue"
            >
              Continue
            </AlertDialogAction>
          </div>
        </AlertDialogFooter> */}
        <AlertDialogFooter className="flex items-end gap-2 rounded-b-lg border bg-zinc-100/75 px-8 py-6 dark:bg-zinc-900/75">
          <div className="flex items-center gap-2">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <div>
              <Button
                onClick={handleUploadCustomers}
                size="sm"
                disabled={!file}
                className="bg-blue text-sm text-white hover:bg-hoverBlue"
              >
                Continue
              </Button>
            </div>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
