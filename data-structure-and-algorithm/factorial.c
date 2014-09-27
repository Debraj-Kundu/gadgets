//Calc big int factorial value
#include <stdio.h>
#include <stdlib.h>
#define N 1000
typedef struct{
	int res[N];
	int digits;
} fact_result;


fact_result fac(const int num)
{
	fact_result result;
	result.res[0]=1;
	result.digits=0;
	int i=1,index,product,shang;
	if (num<0)
	{
		result.res[0]=-1;
		return result;	
	}
	else if(num==0)
	{
		return result;
	}

	while(++i<=num)
	{
		index=0;
		shang=0;
		while(index<=result.digits)
		{
			product=result.res[index]*i+shang;
			result.res[index]=product%10;
			shang=product/10;
			index++;
		}
		while(shang>0)
		{
			result.digits++;
			result.res[result.digits]=shang%10;
			shang=shang/10;
		}
	}
	return result;
}

void print(fact_result result)
{
	int digits=result.digits; 
	while(digits>=0)
	{
		printf("%d",result.res[digits]);
		digits--;
	}
}

int main(void)
{
	int j;
	printf("Please input the value:\n");
	scanf("%d",&j);
	fact_result result=fac(j);
	print(result);
	printf("\nThe total bits is %d\n",result.digits+1);
	return 0;
}
