#include <stdio.h>
#include <stdlib.h>
int main()
{
 	char *filename;//[ 80 ];
   FILE *inputFile;
	char *data;
	filename="readfile.c";
	//printf( "Please enter a file name: " );
	//scanf( "%s", filename );
	if( ( inputFile = fopen( filename, "r" ) ) == NULL ) {
		fprintf( stderr, "Error- Unable to open %s\n", filename );
		exit( -1 );
	}

	if( fscanf( inputFile, "%s", data ) != 1 ) {
		fprintf( stderr, "Error reading from %s\n", filename );
		exit( -2 );
	}

	printf( "Successfully read in %s from %s\n", data, filename );

	fclose( inputFile );
	inputFile = NULL;  // Safety precaution, to prevent trying to use a closed file.
 }   
