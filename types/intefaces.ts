export interface User {
  data?: {
    id:string;
    ROLE:string;
  };
  name?: string | null | undefined;
  ROLE?: string;
  token?:string;
  userName?: string;
  accessToken?: string;
  id?: string;
  isVerified?: boolean;
}


interface datas {
  id: string;
}