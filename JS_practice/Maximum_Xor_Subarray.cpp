#include<bits/stdc++.h>

using namespace std;

#define ff              first
#define ss              second
#define int             long long
#define ll             long long
#define pb              push_back
#define mp              make_pair
#define pii             pair<int,int>
#define vi              vector<int>
#define mii             map<int,int>
#define pqb             priority_queue<int>
#define rep(i,x,y)        for(int i=x; i<y; i++)
#define rrep(i,x,y)       for(int i=x; i>=y; i--)
#define REP(i,x)         for(int i=1;i<=x;i++)
#define pqs             priority_queue<int,vi,greater<int> >
#define setbits(x)      __builtin_popcountll(x)
#define zrobits(x)      __builtin_ctzll(x)
#define mod             1000000007
#define inf             1e18
#define ps(x,y)         fixed<<setprecision(y)<<x
#define mk(arr,n,type)  type *arr=new type[n];
#define w(x)            int x; cin>>x; while(x--)
#define all(x)            (x).begin(),(x).end()
#define uniq(v)           (v).erase(unique(all(v)),(v).end())
#define sz(x)             (int)((x).size())
#define DEBUG(x) cout << '>' << #x << ':' << x << endl;
mt19937                 rng(chrono::steady_clock::now().time_since_epoch().count());

const int32_t M = 1e9 + 7;
const int32_t MM = 998244353;

const int N = 0;

void c_p_c()
{
    ios_base::sync_with_stdio(0); cin.tie(0); cout.tie(0);
#ifndef ONLINE_JUDGE
    freopen("input.txt", "r", stdin);
    freopen("output.txt", "w", stdout);
#endif
}
ll  binexp(ll a, ll b, ll m)
{
    a %= m;
    ll res = 1;
    while (b > 0)
    {
        if (b & 1)
        res = res * a % m;
        a = a * a % m;
        b >>= 1;
    }
    return res;
}
ll modinvfermat(ll a, ll m)
{   
    return binexp(a, m - 2, m);
}
void task(bool flag)
{
    if (flag)
        cout << "YES\n";
    else
        cout << "NO\n";
}

inline ll myceil(ll a, ll  b) 
{
    return (a + b - 1) / b;
}


void solve()
{
    int n;
    cin>>n;
    vi arr(n);
    rep(i,0,n)cin>>arr[i];
 

    int i=0,j=0;
    int curr_xor=0;
    int max_xor=0;
    while(j<n){
       curr_xor=curr_xor^arr[j];
       if(curr_xor>=max_xor){
           max_xor=curr_xor;
       }
       else{
              while(i<=j && curr_xor<max_xor){
                curr_xor=curr_xor^arr[i];
                i++;
                if(curr_xor>=max_xor){
                     max_xor=curr_xor;
                     break;
                }
              }
              if(i==j){
                curr_xor=arr[i];
              }     
       }
         j++;

    }
    
    cout<<max_xor<<"\n";
}




int32_t main()
{

    int t = 1;
    // cin>>t;
    while (t--)
    {
        solve();
    }

  return 0;
}