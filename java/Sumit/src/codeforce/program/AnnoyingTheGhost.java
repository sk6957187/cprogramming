package codeforce.program;

//	Question id: 2237B

import java.io.*;
import java.util.*;

public class AnnoyingTheGhost {

    static class Fenwick {
        int[] bit;
        int n;

        Fenwick(int n) {
            this.n = n;
            bit = new int[n + 2];
        }

        void add(int idx, int val) {
            idx++;
            while (idx <= n) {
                bit[idx] += val;
                idx += idx & -idx;
            }
        }

        int sum(int idx) {
            idx++;
            int res = 0;
            while (idx > 0) {
                res += bit[idx];
                idx -= idx & -idx;
            }
            return res;
        }
    }

    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

        int T = Integer.parseInt(br.readLine());

        while (T-- > 0) {
            int n = Integer.parseInt(br.readLine());

            int[] a = new int[n];
            int[] b = new int[n];

            StringTokenizer st = new StringTokenizer(br.readLine());
            for (int i = 0; i < n; i++)
                a[i] = Integer.parseInt(st.nextToken());

            st = new StringTokenizer(br.readLine());
            for (int i = 0; i < n; i++)
                b[i] = Integer.parseInt(st.nextToken());

            boolean[] used = new boolean[n];
            int[] pos = new int[n];
            boolean possible = true;

            for (int i = 0; i < n && possible; i++) {
                int idx = -1;
                for (int j = 0; j < n; j++) {
                    if (!used[j] && b[j] >= a[i]) {
                        idx = j;
                        break;
                    }
                }
                if (idx == -1) {
                    possible = false;
                } else {
                    used[idx] = true;
                    pos[i] = idx;
                }
            }

            if (!possible) {
                System.out.println(-1);
                continue;
            }

            Fenwick ft = new Fenwick(n);
            long ans = 0;

            for (int i = n - 1; i >= 0; i--) {
                ans += ft.sum(pos[i] - 1);
                ft.add(pos[i], 1);
            }

            System.out.println(ans);
        }
    }
}
