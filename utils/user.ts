import { useState, useEffect } from 'react';

const [loading, setLoading] = useState();
const [user, setUser] = useState();

interface MyWindow extends Window {
  __user: any;
}
export async function useFetchUser() {}
