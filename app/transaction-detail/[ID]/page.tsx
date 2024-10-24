"use client";
import React, { useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { toast } from "sonner";
import { useParams } from "next/navigation";
import { TransactionDetails } from "@/components/transaction-detail";

function Page() {
  const [otp, setOtp] = useState<string>(""); // Estado para almacenar el OTP ingresado
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false); // Estado para manejar si la clave es correcta
  const params = useParams<{ id: string }>(); // Cambia 'tag' y 'item' por 'id'

  // Clave correcta para validar
  const correctOTP = "123456";
  console.log("params", params); // Aquí obtendrás { id: '072a213d-2718-45ef-bb85-9508d735ce6b' }

  // Obtén el path completo
  const fullPath = `transactions-detail/${params.id}`;
  console.log("Full path:", fullPath); // Esto te dará 'transactions-detail/072a213d-2718-45ef-bb85-9508d735ce6b'

  // Función que se ejecuta cuando cambia el valor del OTP
  const handleOTPChange = (value: string) => {
    setOtp(value);

    // Validamos solo si se han ingresado los 6 dígitos
    if (value.length === 6) {
      if (value === correctOTP) {
        setIsAuthenticated(true); // Si la clave es correcta, actualiza el estado
      } else {
        setIsAuthenticated(false);
        toast.error("Invalid OTP. Please try again."); // Muestra un mensaje de error
      }
    }
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      {!isAuthenticated ? (
        <>
          <h1>Enter the key</h1>
          <InputOTP maxLength={6} value={otp} onChange={handleOTPChange}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </>
      ) : (
        <div>
          <TransactionDetails />
        </div>
      )}
    </div>
  );
}

export default Page;
