#include<bits/stdc++.h>
using namespace std;

int helper(vector<int>& v){
	unordered_map<int,int> mp;
	for(int n : v){
		mp[n]++;
	}
	int sum = 0;
	for(auto it : mp){
		if(it.second == 1){
			sum += it.first;
		}else if(it.second > 1){
			sum -= it.first;
		}
        
	}
	return sum;
}

int main(){
	vector<int> v;
	for(int i = 0 ; i < 4; i++){
		int x; cin>>x;
		v.push_back(x);
	}
	cout<<helper(v);
	return 0;
}