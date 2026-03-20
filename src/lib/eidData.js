import { supabase } from "./supabaseClient";

const PAYMENT_IDS = ["upay", "bkash", "nagad", "rocket"];

export const getSharedDataFromUrl = () => {
  const params = new URLSearchParams(window.location.search);
  const encoded = params.get("data");
  if (!encoded) return null;
  try {
    return JSON.parse(decodeURIComponent(atob(encoded)));
  } catch {
    return null;
  }
};

export const encodeSharedDataToUrlParam = (data) => {
  const encoded = btoa(encodeURIComponent(JSON.stringify(data)));
  return encoded;
};

export const getEmptySettings = () => ({
  name: "",
  upay: "",
  bkash: "",
  nagad: "",
  rocket: "",
});

export const getGlobalSettings = async () => {
  // Supabase mode
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("eid_settings")
        .select("id,name,upay,bkash,nagad,rocket")
        .eq("id", 1)
        .maybeSingle();

      if (error) throw error;
      if (!data) return getEmptySettings();

      return {
        name: data.name || "",
        upay: data.upay || "",
        bkash: data.bkash || "",
        nagad: data.nagad || "",
        rocket: data.rocket || "",
      };
    } catch {
      // Don't hard-break the UI if the table/policies aren't ready.
      return {
        name: localStorage.getItem("eid-name") || "",
        upay: localStorage.getItem("eid-number-upay") || "",
        bkash: localStorage.getItem("eid-number-bkash") || "",
        nagad: localStorage.getItem("eid-number-nagad") || "",
        rocket: localStorage.getItem("eid-number-rocket") || "",
      };
    }
  }

  // Local fallback mode
  return {
    name: localStorage.getItem("eid-name") || "",
    upay: localStorage.getItem("eid-number-upay") || "",
    bkash: localStorage.getItem("eid-number-bkash") || "",
    nagad: localStorage.getItem("eid-number-nagad") || "",
    rocket: localStorage.getItem("eid-number-rocket") || "",
  };
};

export const saveGlobalSettings = async (settings) => {
  const normalized = {
    name: (settings.name || "").trim(),
    upay: (settings.upay || "").trim(),
    bkash: (settings.bkash || "").trim(),
    nagad: (settings.nagad || "").trim(),
    rocket: (settings.rocket || "").trim(),
  };

  // Supabase mode
  if (supabase) {
    try {
      const { error } = await supabase
        .from("eid_settings")
        .upsert(
          {
            id: 1,
            ...normalized,
          },
          { onConflict: "id" }
        );

      if (error) throw error;
      return;
    } catch {
      // Fall back to localStorage if Supabase isn't configured yet.
      localStorage.setItem("eid-name", normalized.name);
      PAYMENT_IDS.forEach((id) => {
        localStorage.setItem(`eid-number-${id}`, normalized[id]);
      });
      return;
    }
  }

  // Local fallback mode
  localStorage.setItem("eid-name", normalized.name);
  PAYMENT_IDS.forEach((id) => {
    localStorage.setItem(`eid-number-${id}`, normalized[id]);
  });
};

