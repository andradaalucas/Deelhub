"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import { createCustomersFromCsv } from "@/services/customers";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { File, Upload, X } from "lucide-react";
import Papa from "papaparse";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";

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
    onError() {},
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
          (row: any) => !row.name || !row.email
        );

        if (incompleteRows.length > 0) {
          setRowsWithMissingFields(incompleteRows);
          toast({
            title: "Warning",
            description: `${incompleteRows.length} row(s) have missing name or email fields. You will be able to edit them later.`,
            variant: "destructive",
          });
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
    // Crear los clientes con los datos cargados (incluso si tienen campos vacíos)
    createCustomer.mutate(parsedData);
    toast({
      title: "Successfully imported",
      description:
        rowsWithMissingFields.length > 0
          ? `${rowsWithMissingFields.length} customers have missing fields. Please edit them later.`
          : "All customers imported successfully!",
    });
    setIsOpen(false);
  };

  const removeFile = () => {
    setFile(null);
    setParsedData([]);
    setRowsWithMissingFields([]); // Resetear las filas incompletas
  };

  // Referencia para controlar el foco
  const initialFocusRef = useRef<HTMLButtonElement | null>(null);

  // Focalizar el botón cuando el modal se abre
  useEffect(() => {
    if (isOpen && initialFocusRef.current) {
      initialFocusRef.current.focus();
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <DialogContent className="p-0">
        <div className="p-8">
          <DialogTitle className="mb-2 mt-4">Import CSV File</DialogTitle>
          <DialogDescription className="mb-4">
            Upload a CSV file containing customer information to import new
            customers.
          </DialogDescription>

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
            <div className="mt-4 flex items-center justify-between rounded-lg bg-gray-100 p-4">
              <div className="flex items-center">
                <File className="mr-2 h-5 w-5 text-primary" />
                <span className="text-sm font-medium">{file.name}</span>
              </div>
              <Button variant="ghost" size="icon" onClick={removeFile}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>

        <DialogFooter className="flex justify-end gap-2 rounded-b-lg border bg-[#fafafa] px-8 py-4">
          <Button
            ref={initialFocusRef} // Asignar el foco inicial al botón
            disabled={!file}
            onClick={handleUploadCustomers}
          >
            Create new customers
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
