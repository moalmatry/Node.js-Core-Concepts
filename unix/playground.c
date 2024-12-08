#include <stdio.h>
#include <unistd.h>
#include <stdlib.h>

int main(int argc, char *argv[]) {

  // for (int i = 0; i < argc; i++) {
  //     printf("argv number %d is: %s\n", i, argv[i]);
  // }

  // printf("Process ID: %d\n", getpid());
  // fprintf(stdout, "Parent Process ID: %d\n", getppid());

  // printf("Mode is: %s\n", getenv("MODE"));

  fprintf(stdout, "Some text for stdout. (coming from C)");
  fprintf(stderr, "Some text for stderr. (coming from C)");

  int c = fgetc(stdin);
  while (c != EOF) {
    fprintf(stdout, "%c", c);

    fflush(stdout);

    c = fgetc(stdin);
  }


  return 0;
}