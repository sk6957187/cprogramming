package codeforce.program;
//	Question id: 2238A

import java.util.*;

public class PuzzlefromPapyrus {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        int t = sc.nextInt();

        while (t-- > 0) {
            int n = sc.nextInt();
            int c = sc.nextInt();

            int[] a = new int[n];
            int[] b = new int[n];

            long sumA = 0;
            long sumB = 0;

            for (int i = 0; i < n; i++) {
                a[i] = sc.nextInt();
                sumA += a[i];
            }

            for (int i = 0; i < n; i++) {
                b[i] = sc.nextInt();
                sumB += b[i];
            }

            long INF = Long.MAX_VALUE;
            long ans = INF;

            // Without reordering
            boolean possible1 = true;
            long cost1 = 0;

            for (int i = 0; i < n; i++) {
                if (a[i] < b[i]) {
                    possible1 = false;
                    break;
                }
                cost1 += (a[i] - b[i]);
            }

            if (possible1) {
                ans = Math.min(ans, cost1);
            }

            // With reordering
            int[] sa = a.clone();
            int[] sb = b.clone();

            Arrays.sort(sa);
            Arrays.sort(sb);

            boolean possible2 = true;

            for (int i = 0; i < n; i++) {
                if (sa[i] < sb[i]) {
                    possible2 = false;
                    break;
                }
            }

            if (possible2) {
                long cost2 = (sumA - sumB) + c;
                ans = Math.min(ans, cost2);
            }

            if (ans == INF) {
                System.out.println(-1);
            } else {
                System.out.println(ans);
            }
        }

        sc.close();
    }
}