#include <stdio.h>
#include <stdlib.h>

typedef struct link_node
{
    int num;
    struct link_node *pnext;
} node;

node* create_node(int *arr,int len)
{
    int i;
    node *ptr,*first_node;
    first_node=ptr=(node *)malloc(len*sizeof(node));
    if(!first_node)
	{
		return NULL;
	}
	ptr->num=arr[0];
	ptr->pnext=NULL;
	ptr++;
    for(i=1;i<len;i++)
    {
    	ptr->num = arr[i];
	    ptr->pnext=NULL;
		(ptr-1)->pnext=ptr;
		ptr++;
	}
	return first_node;
}

//Bubble sort
void sort(node* first_node)
{
    node *ptr1,*ptr2;
    int tmp;
    for(ptr1=first_node;ptr1;ptr1=ptr1->pnext)
    {
        for(ptr2=ptr1;ptr2;ptr2=ptr2->pnext)
        {
            if(ptr2->num<ptr1->num)
            {
                 tmp=ptr1->num;
                 ptr1->num=ptr2->num;
                 ptr2->num=tmp;
            }
        }
    }
}

void print(node* first_node)
{
    while(first_node)
    {
        printf("%d  ",first_node->num);
        first_node=first_node->pnext;
    }
}

//test
int main(void)
{
	int a[]={9,6,2,3,8,5,1,7,4};
	int len=sizeof(a)/sizeof(int);
    node* first_node=create_node(a,len);
	if(first_node==NULL)
	{
		return 0;
	}
    printf("Before sorting:\n");
    print(first_node);
    sort(first_node);
    printf("\nAfter sorting:\n");
    print(first_node);
	printf("\n");
	free(first_node);
    return 0;
}
