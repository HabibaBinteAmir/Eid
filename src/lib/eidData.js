import { supabase } from "./supabaseClient";

const PAYMENT_IDS = ["upay", "bkash", "nagad", "rocket"];

export const getSharedParam = () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const data = params.get("data");
  if (id) return { type: "id", value: id };
  if (data) return { type: "data", value: data };
  return null;
};

export const getSharedData = async (sharedParam) => {
  if (!sharedParam) return null;

  if (sharedParam.type === "data") {
    try {
      return JSON.parse(decodeURIComponent(atob(sharedParam.value)));
    } catch {
      return null;
    }
  }

  if (sharedParam.type === "id" && supabase) {
    try {
      const { data, error } = await supabase
        .from("eid_settings")
        .select("name,upay,bkash,nagad,rocket")
        .eq("id", sharedParam.value)
        .maybeSingle();

      if (error) throw error;
      return data;
    } catch (err) {
      console.error("Failed to load shared data from Supabase:", err);
      return null;
    }
  }

  return null;
};

export const createSharedLink = async (settings) => {
  const normalized = {
    name: (settings.name || "").trim(),
    upay: (settings.upay || "").trim(),
    bkash: (settings.bkash || "").trim(),
    nagad: (settings.nagad || "").trim(),
    rocket: (settings.rocket || "").trim(),
  };

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("eid_settings")
        .insert([normalized])
        .select("id")
        .maybeSingle();
        
      if (error) {
        alert("Supabase Error (Please send this to AI): " + error.message);
        console.error("Supabase insert error:", error);
        return encodeSharedDataToUrlParam(normalized);
      }

      if (data && data.id) {
        return `?id=${data.id}`;
      } else {
        return encodeSharedDataToUrlParam(normalized);
      }
    } catch (err) {
      alert("Supabase Exception (Please send this to AI): " + err.message);
      console.error("Supabase exception:", err);
      return encodeSharedDataToUrlParam(normalized);
    }
  } else {
    alert("Supabase is not connected! Ensure .env is loaded and restart Vite.");
  }

  // Fallback to old base64 URL format if Supabase is not configured
  return encodeSharedDataToUrlParam(normalized);
};

export const encodeSharedDataToUrlParam = (data) => {
  const encoded = btoa(encodeURIComponent(JSON.stringify(data)));
  return `?data=${encoded}`;
};

export const getEmptySettings = () => ({
  name: "",
  upay: "",
  bkash: "",
  nagad: "",
  rocket: "",
});

export const getGlobalSettings = async () => {
  // Always load from local storage for the user's personal settings
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

  // Only save to local storage for personal use
  localStorage.setItem("eid-name", normalized.name);
  PAYMENT_IDS.forEach((id) => {
    localStorage.setItem(`eid-number-${id}`, normalized[id]);
  });
};