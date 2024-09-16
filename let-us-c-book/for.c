for (int j = 0; i < n; ++i)
{
	for (int k = 0; k < n; ++k)
	{
		if (num[k]<num[j])
		{
			temp=num[j];
			num[j]=num[k];
			num[k]=temp;
		}
	}
}