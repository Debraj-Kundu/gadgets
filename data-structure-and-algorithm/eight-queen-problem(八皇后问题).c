#include <stdio.h>
#define ROW 8
#define COL 8
#define Y '@'
#define N '*'

void queen(int);
void print(void);
int a[ROW]={0,};    //每个元素代表对应列是否有皇后，0-无，1-有；
int b[ROW+COL-1]={0,};          //每个元素代表对应正对角线方向是否有皇后，0-无，1-有     
int c[ROW+COL-1]={0,};    //每个元素代表对应反对角线方向是否有皇后，0-无，1-有
char m[ROW][COL]={};   //用来显示具体排列情况，用Y代表皇后，N代表空；
int count=0;

int main(void)
{
    int i,j;
    for(i=0;i<ROW;i++)
        for(j=0;j<COL;j++)
            m[i][j]=N;
    queen(0);
    return 0;
}

void queen(int row)
{
    int col;
    for(col=0;col<COL;col++)
    {
        if(!((a[col]) || (b[row-col+COL-1]) || (c[col+row])))
        {
            a[col]=1;
            b[row-col+COL-1]=1;
            c[col+row]=1;
            m[row][col]=Y;
            if(row==ROW-1)
            {
                count++;
                print();
            }
            else
                queen(row+1);
            a[col]=0;
            b[row-col+COL-1]=0;
            c[col+row]=0;
            m[row][col]=N;
       }
    }
}

void print(void)
{
    int i,j;
    printf("count=%d\n",count);
    for(i=0;i<ROW;i++)
    {
        for(j=0;j<COL;j++)
        {
            putchar(m[i][j]);
            putchar(' ');
        }
        putchar('\n');
    }
	    putchar('\n');
}
