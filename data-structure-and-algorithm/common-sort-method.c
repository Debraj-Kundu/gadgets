//包括快速排序,希尔排序,选择排序,冒泡排序,归并排序,插入排序
#include <stdio.h>
#include <stdlib.h>

int *bubble_sort(int *,int);    //Bubble sort function；
int *quick_sort(int *,int);     //Quick sort function,which is merely a wrapper;
void real_quick_sort(int *,int); //Actual quick sort function which called by quick_sort;
int *insert_sort(int *,int);      //Insertion sort function;
int *merge_sort(int *,int);         //2-way merge sort function,which is merely a wrapper;
void real_merge_sort(int *,int);    //Actual merge sort function which called by merge_sort;
void merge(int *,int,int);      //Called by real_merge_sort to fulfill merging two ordered array;
int *select_sort(int *,int);     //Selection sort function;
int *shell_sort(int *,int);     //Shell sort function,which is merely a wrapper;
void shell(int *,int,int);          //Actual merge sort function which called by shell_sort;
void print(int *,int,char *);   //Print the array;

int main(void)
{
    int a[]={6,2,8,67,3,4,13,6,56,5,9,1,7,8};
    int len=sizeof(a)/sizeof(int);
    int i;
    int *ptr=NULL;
    char *str[]={"Bubble sort","quick sort","insertion sort","merge sort","selection sort","shell sort"};
    int dimension=sizeof(str)/sizeof(char *);
    int *(*fun[dimension])(int*,int);
    fun[0]=bubble_sort;
    fun[1]=quick_sort;
    fun[2]=insert_sort;
    fun[3]=merge_sort;
    fun[4]=select_sort;
    fun[5]=shell_sort;
    printf("Before sorting:");
    print(a,len,NULL);
    printf("\nAfter sorting:");
    for(i=0;i<dimension;i++)
    {
        ptr=fun[i](a,len);
        print(ptr,len,str[i]);
        free(ptr);
        ptr=NULL;
    }
	printf("\n");
    return 0;
}

void print(int *str,int len,char *name)
{
    int i;
    if(name)
	{
       printf("\n\t%s",name);
	}
	printf("\n\t");
    for(i=0;i<len;i++)
	{
        printf("%d\t",str[i]);
	}
}

int *bubble_sort(int *a,int len)
{
    int *ptr,i,j;
    ptr=(int *)malloc(sizeof(int)*len);
    for(i=0;i<len;i++)
        ptr[i]=a[i];
    for(i=0;i<len;i++)
    {
        for(j=0;j<len-1-i;j++)
        {
            if(ptr[j]>ptr[j+1])
            {
                ptr[j]=ptr[j]^ptr[j+1];
                ptr[j+1]=ptr[j]^ptr[j+1];
                ptr[j]=ptr[j]^ptr[j+1];
            }
        }
    }
    return ptr;
}

int *quick_sort(int *a,int len)
{
    int *ptr,i,j;
    ptr=(int *)malloc(sizeof(int)*len);
    for(i=0;i<len;i++)
        ptr[i]=a[i];
    real_quick_sort(ptr,len);
    return ptr;
}

void real_quick_sort(int *ptr,int len)
{
    int i,j,key;
    if(len<=1)
        return;
    key=*ptr;
    i=0;
    j=len-1;
    while(i<j)
    {
        while((ptr[j]>=key) && (i<j))
            j--;
        if(i!=j)
            ptr[i++]=ptr[j];
        while((ptr[i]<key) && (i<j))
            i++;
        if(i!=j)
            ptr[j--]=ptr[i];
    }
    if(i==j)
        ptr[i]=key;
    real_quick_sort(ptr,i+1);
    real_quick_sort(ptr+i+1,len-i-1);
}

int *insert_sort(int *a,int len)
{
    int i,j,key,*ptr;
    ptr=(int *)malloc(sizeof(int)*len);
    for(j=0;j<len;j++)
        ptr[j]=a[j];
    i=0;
    while(++i<len)
    {
        j=i;
        key=ptr[j];
        while((key<ptr[j-1]) && (j>0))
        {
            ptr[j]=ptr[j-1];
            j--;
        }
        if(j-i)
            ptr[j]=key;
	    }
	    return ptr;
}

int *merge_sort(int *a,int len)
{
    int *ptr,i;
    ptr=(int *)malloc(sizeof(int)*len);
    for(i=0;i<len;i++)
        ptr[i]=a[i];
    real_merge_sort(ptr,len);
    return ptr;
}

void real_merge_sort(int *a,int len)
{
    int middle;
    if(len<2)
       return;
    middle=len/2;
    real_merge_sort(a,middle);
    real_merge_sort(a+middle,len-middle);
    merge(a,middle,len);
}

void merge(int *a,int middle,int len)
{
    int i=0,j=middle,tmp[len],k=0;
    while((i<middle) && (j<len))
    {
        if(a[i]>a[j])
            tmp[k++]=a[j++];
        else
            tmp[k++]=a[i++];
    }
    while(i<middle)
        tmp[k++]=a[i++];
    while(j<len)
        tmp[k++]=a[j++];

    for(k=0;k<len;k++)
        a[k]=tmp[k];
}

int *select_sort(int *a,int len)
{
    int i,j,*ptr;
    ptr=(int*)malloc(sizeof(int)*len);
    for(i=0;i<len;i++)
        ptr[i]=a[i];
    for(i=0;i<len;i++)
    {
        for(j=i+1;j<len;j++)
        {
            if(ptr[i]>ptr[j])
            {
                ptr[i]=ptr[i]^ptr[j];
                ptr[j]=ptr[i]^ptr[j];
                ptr[i]=ptr[i]^ptr[j];
            }
        }
    }
    return ptr;
}

int *shell_sort(int *a,int len)
{
    int *ptr,i;
    ptr=(int *)malloc(sizeof(int)*len);
    for(i=0;i<len;i++)
        ptr[i]=a[i];
    shell(ptr,len,len/2);
    return ptr;
}

void shell(int *a,int len,int step)
{
    int i,j,k,key;
    if(step<1)
        return;
    for(i=0;i<step;i++)
    {
        for(j=i+step;j<len;j+=step)
        {
            key=a[j];
            for(k=j-step;(k>=0)&&(a[k]>a[k+step]);k-=step)
            {
                a[k]=a[k]^a[k+step];
                a[k+step]=a[k]^a[k+step];
                a[k]=a[k]^a[k+step];
            }
            if(k==j-step)
                a[k+step]=key;
        }
    }
    shell(a,len,step/2);
}
