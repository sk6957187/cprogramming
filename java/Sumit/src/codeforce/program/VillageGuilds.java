package codeforce.program;


//Question id: 2238C

import java.util.ArrayList;
import java.io.*;
import java.util.*;

public class VillageGuilds {
    static ArrayList<Integer>[] tree;
    static int[] depth;
    static int[] maxDepth;
    static long ans;

    static void dfs(int v) {
        maxDepth[v] = depth[v];

        int first = depth[v];
        int second = depth[v];

        for (int child : tree[v]) {
            depth[child] = depth[v] + 1;
            dfs(child);

            maxDepth[v] = Math.max(maxDepth[v], maxDepth[child]);

            if (maxDepth[child] >= first) {
                second = first;
                first = maxDepth[child];
            } else if (maxDepth[child] > second) {
                second = maxDepth[child];
            }
        }

        ans += (second - depth[v] + 1);
    }

    public static void main(String[] args) throws Exception {
    	Scanner sc = new Scanner(System.in);
        StringBuilder out = new StringBuilder();

        int t = sc.nextInt();

        while (t-- > 0) {
//        	System.out.println("Enter n: ");
            int n = sc.nextInt();

            tree = new ArrayList[n + 1];
            for (int i = 1; i <= n; i++)
                tree[i] = new ArrayList<>();

            if (n > 1) {
                for (int i = 2; i <= n; i++) {
//                	System.out.println("enter");
                    int p = sc.nextInt();
                    tree[p].add(i);
                }
            }

            depth = new int[n + 1];
            maxDepth = new int[n + 1];
            ans = 0;

            dfs(1);
            System.out.println(ans);
        }

        sc.close();
    }
}
