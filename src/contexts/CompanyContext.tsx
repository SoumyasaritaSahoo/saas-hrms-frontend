"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { useSelector } from "react-redux";

import { RootState, dispatch } from "@/app/redux/store";
import {
  setCompany as setCompanyAction,
  clearCompany as clearCompanyAction,
} from "@/app/redux/slices/Auth/auth";
import { setAxiosCompanyId } from "../../services/http.services";

export interface Company {
  id: number | string;
  name: string;
  logo?: string | null;
  email_domain?: string;
  industry_name?: string;
  website?: string | null;
  phone?: string | null;
  country?: string;
  currency?: string;
  gst_number?: string | null;
  pan_number?: string | null;
  status?: boolean;
  is_setup?: boolean;
  [key: string]: unknown;
}

interface CompanyContextValue {
  company: Company | null;
  setCompany: (company: Company) => void;
  clearCompany: () => void;
}

const CompanyContext = createContext<CompanyContextValue>({
  company: null,
  setCompany: () => {},
  clearCompany: () => {},
});

export function CompanyProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const reduxCompany = useSelector(
    (state: RootState) => state.auth.company,
  );

  const [company, setCompanyState] = useState<Company | null>(null);

  useEffect(() => {
    if (reduxCompany) {
      setCompanyState(reduxCompany);
      setAxiosCompanyId(reduxCompany.id);
    } else {
      setCompanyState(null);
      setAxiosCompanyId(null);
    }
  }, [reduxCompany]);

  const handleSetCompany = useCallback((c: Company) => {
    setCompanyState(c);
    dispatch(setCompanyAction(c as any));
    setAxiosCompanyId(c.id);
  }, []);

  const handleClearCompany = useCallback(() => {
    setCompanyState(null);
    dispatch(clearCompanyAction() as any);
    setAxiosCompanyId(null);
  }, []);

  return (
    <CompanyContext.Provider
      value={{
        company,
        setCompany: handleSetCompany,
        clearCompany: handleClearCompany,
      }}
    >
      {children}
    </CompanyContext.Provider>
  );
}

export function useCompany() {
  const ctx = useContext(CompanyContext);
  if (!ctx) {
    throw new Error("useCompany must be used within a CompanyProvider");
  }
  return ctx;
}
