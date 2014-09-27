//Written on 2011-09-06
//Find longest common string of two string
#include <stdio.h>
#include <stdlib.h>

char *find_max_common_str(char *str1,char *str2)
{
	int max,tmp;
	char *p11,*p12,*p13,*p21,*p22,*p23;
	max=tmp=0;

	for(p11=str1;*p11;p11++)
	{
		for(p21=str2;*p21;p21++)
		{
			tmp=0;
			p12=p11;
			p22=p21;
			while((*p12==*p22)&& *p12 && *p22)
			{
				tmp++;
				p12++;
				p22++;
			}
			if(max<tmp)
			{
				max=tmp;
				p13=p12;
			}
		}
	}

	if(max>0)
	{
		tmp=max;
		p23=(char *)malloc(tmp+1);
		p13=p13-tmp;
		while(tmp--)
		*p23++=*p13++;
		*p23='\0';
		 p23=p23-max;
	}
	return p23;
}

int main(void)
{
	char str1[]="adbccadebbca";
	char str2[]="edabccadece";
	char *str;
	str=find_max_common_str(str1,str2);
	printf("Longest common string:%s\n",str);
	return 0;
}
