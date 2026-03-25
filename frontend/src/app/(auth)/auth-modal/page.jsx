"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import LoginModal from "@/components/modals/LoginModal";

export default function Page() {
  const [openLogin, setOpenLogin] = useState(false);

  return (
    <div>
      {/* Button to open modal */}
      <Button
        text="Login"
        onClick={() => setOpenLogin(true)}
      />

      {/* Modal */}
      <LoginModal
        isOpen={openLogin}
        onClose={() => setOpenLogin(false)}
        onLoginSuccess={() => {
          console.log("User Logged In ✅");
        }}
      />
    </div>
  );
}