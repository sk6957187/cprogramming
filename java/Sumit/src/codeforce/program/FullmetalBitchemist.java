package codeforce.program;
//	Question id: 2237D 

import java.util.*;

public class FullmetalBitchemist {

    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        int T = sc.nextInt();

        while (T-- > 0) {

            int n = sc.nextInt();
            String s = sc.next();

            long total = 1L * n * (n + 1) / 2;

            long[] cnt = new long[3];
            cnt[0] = 1;

            int pref = 0;
            long badMod = 0;

            for (int i = 0; i < n; i++) {
                if (s.charAt(i) == '0')
                    pref++;
                else
                    pref--;

                int m = ((pref % 3) + 3) % 3;
                badMod += cnt[m];
                cnt[m]++;
            }

            long ans = total - badMod;

            int i = 0;
            while (i < n) {
                int j = i;
                while (j + 1 < n && s.charAt(j) != s.charAt(j + 1))
                    j++;

                int len = j - i + 1;

                if (len > 1) {
                    long odd = (len - 1L) * (len - 1L) / 4;
                    ans -= odd;

                    long even = (1L * len * (len + 2) / 8) - len / 2;
                    ans -= even;
                }

                i = j + 1;
            }

            ans += n;

            System.out.println(ans);
        }

        sc.close();
    }
}