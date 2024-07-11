'use client';

import { useState } from 'react';
import { ChakraProvider, Box, Heading, Table, Thead, Tbody, Tr, Th, Td, TableContainer, Badge, Container, Input, Button, Flex, Select } from '@chakra-ui/react';

interface Product {
  id: number;
  name: string;
  reason: string;
}

const products: Product[] = [
  { id: 1, name: 'Product A', reason: 'Supports Israel' },
  { id: 2, name: 'Product B', reason: 'Supports Israel' },
  { id: 3, name: 'Product C', reason: 'Supports Israel' },
  // Tambahkan lebih banyak data untuk demonstrasi pagination
  { id: 4, name: 'Product D', reason: 'Supports Israel' },
  { id: 5, name: 'Product E', reason: 'Supports Israel' },
  { id: 6, name: 'Product F', reason: 'Supports Israel' },
  { id: 7, name: 'Product G', reason: 'Supports Israel' },
  { id: 8, name: 'Product H', reason: 'Supports Israel' },
  { id: 9, name: 'Product I', reason: 'Supports Israel' },
  { id: 10, name: 'Product J', reason: 'Supports Israel' },
];

const BlacklistPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedProducts = itemsPerPage === -1 
    ? filteredProducts 
    : filteredProducts.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      );

  const totalPages = itemsPerPage === -1 
    ? 1 
    : Math.ceil(filteredProducts.length / itemsPerPage);

  return (
    <ChakraProvider>
      <Container maxW="container.xl">
        <Box mt={8} p={5} shadow="md" borderWidth="1px" borderRadius="md">
          <Heading as="h2" size="lg" mb={4}>
            Blacklisted Products
          </Heading>
          <Input
            placeholder="Search products..."
            mb={4}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Flex justifyContent="space-between" mb={4}>
            <Select 
              width="auto"
              value={itemsPerPage} 
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
              <option value={50}>50</option>
              <option value={-1}>All</option>
            </Select>
          </Flex>
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th>Name</Th>
                  <Th>Reason</Th>
                </Tr>
              </Thead>
              <Tbody>
                {paginatedProducts.map((product) => (
                  <Tr key={product.id}>
                    <Td>{product.id}</Td>
                    <Td>{product.name}</Td>
                    <Td>
                      <Badge colorScheme="red">{product.reason}</Badge>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
          <Flex justifyContent="space-between" mt={4}>
            <Button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <Box>
              Page {currentPage} of {totalPages}
            </Box>
            <Button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </Flex>
        </Box>
      </Container>
    </ChakraProvider>
  );
};

export default BlacklistPage;
