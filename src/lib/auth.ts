import { supabase } from "./supabase/client";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials extends LoginCredentials {
  name: string;
}

export async function signIn({ email, password }: LoginCredentials) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function signUp({ email, password, name }: SignupCredentials) {
  // Sign up the user
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
      },
    },
  });

  if (authError) {
    throw new Error(authError.message);
  }

  // If sign up was successful and we have a user, create a profile
  if (authData.user) {
    const { error: profileError } = await supabase.from("profiles").insert([
      {
        id: authData.user.id,
        name,
        avatar_url: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
      },
    ]);

    if (profileError) {
      console.error("Error creating profile:", profileError);
    }
  }

  return authData;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw new Error(error.message);
  }
}

export async function getCurrentUser() {
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    return null;
  }
  return data.user;
}

export async function getUserProfile(userId: string) {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) {
    console.error("Error fetching profile:", error);
    return null;
  }

  return data;
}
