struct s
{
int i;
float f;
char c[10];
}
s, *sp;
sp = &s;
printf(“%d”,sizeof(sp));