import { useEffect, useState } from 'react';
import axios from 'axios';

import { DEFAULT_LOGO } from './constants';

interface ClearbitSuggestion {
  logo?: string;
  domain?: string;
}

export function useCompanyLogo(company: string): string {
  const [logo, setLogo] = useState(DEFAULT_LOGO);

  useEffect(() => {
    if (company.length === 0) {
      setLogo(DEFAULT_LOGO);
      return undefined;
    }

    let cancelled = false;

    async function fetchCompanyLogo() {
      try {
        const result = await axios.get<ClearbitSuggestion[]>(
          'https://autocomplete.clearbit.com/v1/companies/suggest',
          { params: { query: company } },
        );
        if (cancelled) {
          return;
        }

        const match = result.data[0];
        if (match?.logo) {
          setLogo(match.logo);
        } else if (match?.domain) {
          setLogo(`https://logo.clearbit.com/${match.domain}`);
        } else {
          setLogo(DEFAULT_LOGO);
        }
      } catch {
        if (!cancelled) {
          setLogo(DEFAULT_LOGO);
        }
      }
    }

    setLogo(DEFAULT_LOGO);
    fetchCompanyLogo();

    return () => {
      cancelled = true;
    };
  }, [company]);

  return logo;
}
